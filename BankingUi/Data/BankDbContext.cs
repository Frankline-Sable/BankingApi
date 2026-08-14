using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace BankingApi.Data
{
  public class BankDbContext : DbContext
  {
    public BankDbContext(DbContextOptions<BankDbContext> options) : base(options)
    {
    }

    // Represents database tabel
    public DbSet<TransactionDbModel> Transactions { get; set; }

    // This keeps track of processed idempotency keys to prevent double spending
    public DbSet<IdempotencyKeyRecord> IdempotencyKeys { get; set; }
  }

  // Table structures(entities)
  public class TransactionDbModel
  {
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string AccountTo { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
  }

  public class IdempotencyKeyRecord
  {
    [Key]
    public string Key { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  }
}
