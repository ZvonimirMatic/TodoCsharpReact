using Microsoft.EntityFrameworkCore;
using TodoCsharpReact.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace TodoCsharpReact.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions options)
        : base(options)
    {

    }
}
