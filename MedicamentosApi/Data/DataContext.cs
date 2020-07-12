using Microsoft.EntityFrameworkCore;

namespace MedicamentosApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Categorie> Categories { get; set; }
        public DbSet<Drug> Drugs { get; set; }
    }
}