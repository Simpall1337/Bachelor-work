using Microsoft.EntityFrameworkCore;
using expenses_analysis.Models;

namespace expenses_analysis
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options)
        {
        }

        private static readonly ILoggerFactory _loggerFactory = LoggerFactory.Create(builder =>
        {
            builder.AddConsole();
        });
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseLoggerFactory(_loggerFactory);
            optionsBuilder.UseSqlServer("Server=localhost\\SASHASQL;Database=expenses;Trusted_Connection=true;TrustServerCertificate=True;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           // modelBuilder.Entity<Employee>().Property(x => x.Birthday).HasColumnType("smalldatetime");
          
            modelBuilder.Entity<Users>().HasKey(x => x.id_User);
            modelBuilder.Entity<Budget>().HasKey(x => x.id_Budget);

            modelBuilder.Entity<Users>().Property(x => x.id_User).UseIdentityColumn();
            modelBuilder.Entity<Budget>().Property(x => x.id_Budget).UseIdentityColumn();
            

        }
        public DbSet<Users> Users { get; set; }
        public DbSet<Budget> Budget { get; set; }
    }
}
