namespace TodoCsharpReact.Dtos;

public record TodoItemDto(
    int Id,
    string Text,
    DateTime DateCreated,
    DateTime? DueDate,
    bool IsCompleted
);
