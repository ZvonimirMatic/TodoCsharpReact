using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using TodoCsharpReact.Data;
using TodoCsharpReact.Dtos;
using TodoCsharpReact.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapRazorPages();

app
    .MapGet("api/TodoItem", async (ApplicationDbContext dbContext, ClaimsPrincipal user) =>
    {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier)!;

        var todoItems = await dbContext
            .Set<TodoItem>()
            .Where(x => x.UserId == userId)
            .OrderBy(x => x.IsCompleted)
            .ThenBy(x => x.DueDate)
            .ThenByDescending(x => x.DateCreated)
            .ToListAsync();

        var todoItemDtos = todoItems.Select(x => new TodoItemDto(x.Id, x.Text, x.DateCreated, x.DueDate, x.IsCompleted));

        return Results.Ok(todoItemDtos);
    })
    .RequireAuthorization()
    .WithName("GetAllTodoItems");

app
    .MapGet("api/TodoItem/{id}", async (ApplicationDbContext dbContext, ClaimsPrincipal user, int id) =>
    {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier)!;

        var todoItem = await dbContext
            .Set<TodoItem>()
            .FindAsync(id);

        if (todoItem is null)
        {
            return Results.NotFound();
        }

        if (todoItem.UserId != userId)
        {
            return Results.Forbid();
        }

        var todoItemDto = new TodoItemDto(todoItem.Id, todoItem.Text, todoItem.DateCreated, todoItem.DueDate, todoItem.IsCompleted);

        return Results.Ok(todoItemDto);
    })
    .RequireAuthorization()
    .WithName("GetTodoItem");

app
    .MapPost("api/TodoItem", async (ApplicationDbContext dbContext, ClaimsPrincipal user, CreateUpdateTodoItemDto createUpdateTodoItemDto) =>
    {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier)!;

        var todoItem = new TodoItem
        {
            Text = createUpdateTodoItemDto.Text,
            DueDate = createUpdateTodoItemDto.DueDate,
            IsCompleted = false,
            UserId = userId
        };

        dbContext.Add(todoItem);

        await dbContext.SaveChangesAsync();

        var todoItemDto = new TodoItemDto(todoItem.Id, todoItem.Text, todoItem.DateCreated, todoItem.DueDate, todoItem.IsCompleted);

        return Results.CreatedAtRoute("GetTodoItem", new { id = todoItem.Id }, todoItemDto);
    })
    .RequireAuthorization()
    .WithName("CreateTodoItem");

app
    .MapPut("api/TodoItem/{id}", async (ApplicationDbContext dbContext, ClaimsPrincipal user, CreateUpdateTodoItemDto createUpdateTodoItemDto, int id) =>
    {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier)!;

        var todoItem = await dbContext
            .Set<TodoItem>()
            .FindAsync(id);

        if (todoItem is null)
        {
            return Results.NotFound();
        }

        if (todoItem.UserId != userId)
        {
            return Results.Forbid();
        }

        todoItem.Text = createUpdateTodoItemDto.Text;
        todoItem.DueDate = createUpdateTodoItemDto.DueDate;

        await dbContext.SaveChangesAsync();

        var todoItemDto = new TodoItemDto(todoItem.Id, todoItem.Text, todoItem.DateCreated, todoItem.DueDate, todoItem.IsCompleted);

        return Results.Ok(todoItemDto);
    })
    .RequireAuthorization()
    .WithName("UpdateTodoItem");

app
    .MapDelete("api/TodoItem/{id}", async (ApplicationDbContext dbContext, ClaimsPrincipal user, int id) =>
    {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier)!;

        var todoItem = await dbContext
            .Set<TodoItem>()
            .FindAsync(id);

        if (todoItem is null)
        {
            return Results.NotFound();
        }

        if (todoItem.UserId != userId)
        {
            return Results.Forbid();
        }

        dbContext.Remove(todoItem);

        await dbContext.SaveChangesAsync();

        return Results.Ok();
    })
    .RequireAuthorization()
    .WithName("DeleteTodoItem");

app
    .MapPut("api/TodoItem/{id}/ToggleIsCompleted", async (ApplicationDbContext dbContext, ClaimsPrincipal user, int id) =>
    {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier)!;

        var todoItem = await dbContext
            .Set<TodoItem>()
            .FindAsync(id);

        if (todoItem is null)
        {
            return Results.NotFound();
        }

        if (todoItem.UserId != userId)
        {
            return Results.Forbid();
        }

        todoItem.IsCompleted = !todoItem.IsCompleted;

        await dbContext.SaveChangesAsync();

        var todoItemDto = new TodoItemDto(todoItem.Id, todoItem.Text, todoItem.DateCreated, todoItem.DueDate, todoItem.IsCompleted);
        
        return Results.Ok(todoItemDto);
    })
    .RequireAuthorization()
    .WithName("ToggleIsTodoItemCompleted");

app.MapFallbackToFile("index.html");

app.Run();
