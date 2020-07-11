using Microsoft.EntityFrameworkCore;

namespace MedicamentosApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
            //("Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=master;Data Source=DESKTOP-6UCAG1C\SQLEXPRESS")
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Categorie> Categories { get; set; }
        public DbSet<Drug> Drugs { get; set; }
    }
}