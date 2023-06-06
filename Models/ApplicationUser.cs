using Microsoft.AspNetCore.Identity;

namespace TodoCsharpReact.Models;

public class ApplicationUser : IdentityUser
{
    public List<TodoItem> TodoItems { get; set; } = new List<TodoItem>();
}
