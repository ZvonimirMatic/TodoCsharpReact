namespace TodoCsharpReact.Dtos;

public record CreateUpdateTodoItemDto(
    string Text,
    DateTime? DueDate
);
