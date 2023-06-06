using FluentValidation;
using TodoCsharpReact.Dtos;

namespace TodoCsharpReact.Validators;

public class CreateUpdateTodoItemValidator : AbstractValidator<CreateUpdateTodoItemDto>
{
    public CreateUpdateTodoItemValidator()
    {
        RuleFor(x => x.Text).NotEmpty();
    }
}
