using System.ComponentModel.DataAnnotations;

public class UserLogin
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MinLength(6)] // Пример: минимальная длина пароля
    public string Password { get; set; }


}
