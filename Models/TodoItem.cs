using System.ComponentModel.DataAnnotations.Schema;

namespace TodoCsharpReact.Models;

public class TodoItem
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Text { get; set; } = default!;
    public DateTime DateCreated { get; set; }
    public DateTime? DueDate { get; set; }
    public bool IsCompleted { get; set; }

    public string UserId { get; set; } = default!;
    public ApplicationUser? User { get; set; }
}
