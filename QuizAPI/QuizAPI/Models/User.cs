using System.ComponentModel.DataAnnotations;

public class User
{
    public int Id { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    public string Name { get; set; }

    [Required]
    [MinLength(6)] // Пример: минимальная длина пароля
    public string Password { get; set; }


}
