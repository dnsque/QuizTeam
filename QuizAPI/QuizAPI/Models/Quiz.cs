using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QuizAPI.Models
{
    public class Quiz
    {
        [Key]
        public int QuizId { get; set; }

        [Required]
        [StringLength(255)]
        public string Title { get; set; }

        // Навигационное свойство для списка вопросов
        public ICollection<Question> Questions { get; set; }
    }
}
