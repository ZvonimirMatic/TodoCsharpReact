using Microsoft.EntityFrameworkCore;
using TodoCsharpReact.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace TodoCsharpReact.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public DbSet<TodoItem> TodoItems { get; set; } = default!;
    
    public ApplicationDbContext(DbContextOptions options)
        : base(options)
    {

    }
}
