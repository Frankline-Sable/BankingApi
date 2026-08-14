using BankingApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankingApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransferController : ControllerBase
    {
        private readonly BankDbContext _context;

        public TransferController(BankDbContext context)
        {
            _context = context;
        }

        [HttpPost("execute")]
        public async Task<IActionResult> Transfer([FromBody] TransferRequest request,
            [FromHeader(Name = "X-Idempotency-Key")]
            string idempotencyKey)
        {
            if (string.IsNullOrEmpty(idempotencyKey))
            {
                return BadRequest("Missing parameter: idempotencyKey header value");
            }

            var keyExists = await _context.IdempotencyKeys.AnyAsync(k => k.Key == idempotencyKey);
            if (keyExists)
            {
                return BadRequest("Duplicate transaction detected. Request already processed.");
            }

            if (request.Amount <= 0)
            {
                return BadRequest("Amount must be greater than zero");
            }

            // 4. Save the security key and transaction record inside an atomized transaction blocks
            var keyRecord = new IdempotencyKeyRecord { Key = idempotencyKey };
            var transactionRecord = new TransactionDbModel
            {
                AccountTo = request.AccountTo,
                Amount = request.Amount
            };

            // Stage data updates in internal application memory tracking structures
            _context.IdempotencyKeys.Add(keyRecord);
            _context.Transactions.Add(transactionRecord);

            // Execute actual SQL writing command asynchronously to persist changes
            await _context.SaveChangesAsync();
            return Ok(transactionRecord);
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetHistory()
        {
            var history = await _context.Transactions.OrderByDescending(t => t.Timestamp).ToListAsync();
            
            return Ok(history);
        }
    }

    public record TransferRequest(string AccountTo, decimal Amount);
}