using expenses_analysis.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace expenses_analysis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly DataBaseContext db;

        public ExpensesController(DataBaseContext dbContext)
        {
            db = dbContext;
        }
        [HttpGet("getYearExpenses")]
        public IActionResult getYearExpenses(int id_User,int year)
        {
            try
            {
                if (year == 0)
                {
                    year = DateTime.Now.Year;
                }
                //  var getIdUser = db.Users.FirstOrDefault(x => x.login == login).id_User;

                var getYearExpenses = db.Expenses.Where(x => x.User.id_User == id_User && x.date.Year == year);
                var countExpenses = getYearExpenses.Count();

                var maxExpenses = getYearExpenses.Max(x => x.amout_money);
                var minExpenses = getYearExpenses.Min(x => x.amout_money);
                //var maxExpensesCategory = getYearExpenses.Count();

                var categoryCounts = db.Expenses
                    .Where(x => x.User.id_User == id_User && x.date.Year == year)
                    .GroupBy(x => x.category) // Предположим, что столбец с числами называется "Number"
                    .Select(g => new { category = g.Key, Count = g.Count() })
                    .ToList();

                var maxCategory = categoryCounts.Max(x => x.Count);

                var findMaxCategory = categoryCounts.FirstOrDefault(x => x.Count == maxCategory).category;

                var sumExpenses = getYearExpenses.Sum(x => x.amout_money);

                var category = categoryCounts.Select(x => x.category).ToList();

                var result = new
                {
                    countExpenses = countExpenses,
                    maxExpenses = maxExpenses,
                    categoryCounts = category,
                    maxCategory = findMaxCategory,
                    expenses = getYearExpenses,
                    sumExpenses = sumExpenses
                };

                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest();
                throw;
            }
            
        }
        [HttpGet("getMonthExpenses")]
        public IActionResult getMonthExpenses(int id_User, int month,int year)
        {
            try
            {
                if (month == 0)
                {
                    month = DateTime.Now.Month;
                }
                if (year == 0)
                {
                    year = DateTime.Now.Year;
                }
                //  var getIdUser = db.Users.FirstOrDefault(x => x.login == login).id_User;

                var getYearExpenses = db.Expenses.Where(x => x.User.id_User == id_User && x.date.Year == year && x.date.Month == month);
                var countExpenses = getYearExpenses.Count();

                var maxExpenses = getYearExpenses.Max(x => x.amout_money);
                var minExpenses = getYearExpenses.Min(x => x.amout_money);
                //var maxExpensesCategory = getYearExpenses.Count();

                var categoryCounts = db.Expenses
                    .Where(x => x.User.id_User == id_User && x.date.Year == year && x.date.Month == month)
                    .GroupBy(x => x.category) // Предположим, что столбец с числами называется "Number"
                    .Select(g => new { category = g.Key, Count = g.Count() })
                    .ToList();

                var maxCategory = categoryCounts.Max(x => x.Count);

                var findMaxCategory = categoryCounts.FirstOrDefault(x => x.Count == maxCategory).category;

                var sumExpenses = getYearExpenses.Sum(x => x.amout_money);

                var category = categoryCounts.Select(x => x.category).ToList();

                var result = new
                {
                    countExpenses = countExpenses,
                    maxExpenses = maxExpenses,
                    categoryCounts = category,
                    maxCategory = findMaxCategory,
                    expenses = getYearExpenses,
                    sumExpenses = sumExpenses
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest();
                throw;
            }
            
        }
        [HttpPost]
        public IActionResult addExpenses(ExpensesDto expensesDto)
        {
            var user = db.Users.FirstOrDefault(x => x.id_User == expensesDto.id_User);
            var add = new Expenses
            {
                category = expensesDto.category,
                date = expensesDto.date,
                description = expensesDto.description,
                User = user,
                amout_money = expensesDto.amout_money,
            };
            db.Expenses.Add(add);
            db.SaveChanges();
            return Ok();
        }
        [HttpDelete]
        public IActionResult deleteExpenses(int id)
        {
            try
            {
                var idDelete = db.Expenses.FirstOrDefault(x => x.id_Expenses == id);
                db.Expenses.Remove(idDelete);
                db.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
      
        }
        [HttpPatch]
        public IActionResult updateExpenses(ExpensesDto expensesDto)
        {
            var expenses = db.Expenses.SingleOrDefault(x => x.id_Expenses == expensesDto.id_Expenses);
            if (expenses != null)
            {
                //expenses.id_Expenses = expensesDto.id_Expenses;
                expenses.category = expensesDto.category;
                expenses.amout_money = expensesDto.amout_money;
                expenses.date = expensesDto.date;
                expenses.description = expensesDto.description;
                db.SaveChanges();
                return Ok();
            }
            else
            {
                return StatusCode(500, "Entity d'ont exist");
            }
        }
    }
}
