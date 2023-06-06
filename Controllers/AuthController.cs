using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TodoCsharpReact.Models;

namespace TodoCsharpReact.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
[AllowAnonymous]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;
    private readonly IAuthorizationService _authorizationService;
    private readonly UserManager<ApplicationUser> _userManager;

    public AuthController(ILogger<AuthController> logger, IAuthorizationService authorizationService, UserManager<ApplicationUser> userManager)
    {
        _logger = logger;
        _authorizationService = authorizationService;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<bool> Authorize(string? policy, string? roles)
    {
        if (!string.IsNullOrWhiteSpace(policy))
        {
            return (await _authorizationService.AuthorizeAsync(User, policy)).Succeeded;
        }

        if (!string.IsNullOrWhiteSpace(roles))
        {
            var rolesArray = roles.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

            foreach (var role in rolesArray)
            {
                if (User.IsInRole(role))
                {
                    return true;
                }
            }

            return false;
        }

        return User.Identity?.IsAuthenticated ?? false;
    }

    [HttpGet]
    public IDictionary<string, string> GetUserClaims()
    {
        return User.Claims.ToDictionary(x => x.Type, x => x.Value);
    }
}
