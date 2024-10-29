using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizAPI.Models
{
    public class QuizDbContext: DbContext
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options) {

        }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Quiz>? Quiz { get; set; }
        public DbSet<User>? User { get; set; }

    }
}
