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
            modelBuilder.Entity<Analytics>().HasKey(x => x.id_Analytics);
            modelBuilder.Entity<Expenses>().HasKey(x => x.id_Expenses);
            modelBuilder.Entity<Category>().HasKey(x => x.id_Category);

            modelBuilder.Entity<Users>().Property(x => x.id_User).UseIdentityColumn();
            modelBuilder.Entity<Budget>().Property(x => x.id_Budget).UseIdentityColumn();
            modelBuilder.Entity<Analytics>().Property(x => x.id_Analytics).UseIdentityColumn();
            modelBuilder.Entity<Expenses>().Property(x => x.id_Expenses).UseIdentityColumn();
            modelBuilder.Entity<Category>().Property(x => x.id_Category).UseIdentityColumn();
            

        }
        public DbSet<Users> Users { get; set; }
        public DbSet<Budget> Budget { get; set; }
        public DbSet<Analytics> Analytics { get; set; }
        public DbSet<Expenses> Expenses { get; set; }
        public DbSet<Category> Category { get; set; }
    }
}
