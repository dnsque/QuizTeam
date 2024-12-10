using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizAPI.Models
{
    public class QuizDbContext : DbContext
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options)
        {

        }
        public DbSet<User>? User { get; set; }

    }
}