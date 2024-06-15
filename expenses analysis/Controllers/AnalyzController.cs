using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Protocol;

namespace expenses_analysis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalyzController : ControllerBase
    {
        private readonly DataBaseContext db;

        public AnalyzController(DataBaseContext dbContext)
        {
            db = dbContext;
        }
        [HttpGet]
        public IActionResult getUserAnalyz(string login)
        {
            try
            {
                var getIdUser = db.Users.FirstOrDefault(x => x.login == login).id_User;
                var getBudgetUser = db.Budget.FirstOrDefault(x => x.User.id_User == getIdUser).user_Budget;
                var getUserExpenses = db.Expenses.Where(x => x.User.id_User == getIdUser).ToList();
                var result = new
                {
                    id_User = getIdUser,
                    budget = getBudgetUser,
                    expenses = getUserExpenses
                };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Нема даних!");
                throw;
            }
           
        }
        [HttpGet("getUserExpensesById")]
        public IActionResult getUserExpensesById(int id_User)
        {
            var getBudgetUser = db.Budget.FirstOrDefault(x => x.User.id_User == id_User).user_Budget;
            var getUserExpenses = db.Expenses.Where(x => x.User.id_User == id_User);
            var result = new
            {
                id_User = id_User,
                budget = getBudgetUser,
                expenses = getUserExpenses
            };
            return Ok(result);
        }

        [HttpGet("getAnalyzAnalyz")]
        public IActionResult getAnalyz(int id_User, int year, int month)
        {
            string countExpensesText = " ";
            string sumExpensesText = " ";
            string countCategory = " ";

            var getMonth = DateTime.Now.Month;
            var getYear = DateTime.Now.Year;

            var getExpensesNow = db.Expenses.Where(x => x.User.id_User == id_User && x.date.Year == getYear && x.date.Month == getMonth);

            var getExpensesPaste = db.Expenses.Where(x => x.User.id_User == id_User && x.date.Year == year && x.date.Month == month);

            var countExpensesNow = getExpensesNow.Count();

            var countExpensesPaste = getExpensesPaste.Count();

            var countCategoryNow = getExpensesNow
                                      .Select(x => x.category)
                                      .Distinct()
                                      .ToList();
            var countCategoryPaste = getExpensesPaste
                                      .Select(x => x.category)
                                      .Distinct()
                                      .ToList();
            var findSumExpensesNow = getExpensesNow.Sum(x => x.amout_money);

            var findSumExpensesPaste = getExpensesPaste.Sum(x => x.amout_money);

            if (countExpensesNow > countExpensesPaste)
            {
                countExpensesText = "Витрат більше ніж в обраному періоді! Тепер : " + countExpensesNow + " > у вибраному періоді : " +countExpensesPaste;
            }
            else
            {
                countExpensesText = "Витрат більше ніж тепер! Тепер : " + countExpensesNow + " < у вибраному періоді : " + countExpensesPaste;
            }
            if (findSumExpensesNow > findSumExpensesPaste)
            {
                sumExpensesText = "Сума витрат більше ніж в обраному періоді! Тепер :" + findSumExpensesNow + " > у вибраному періоді : " + findSumExpensesPaste;
            }
            else
            {
                sumExpensesText = "Сума витрат більше ніж тепер! Тепер : " + findSumExpensesNow + " < у вибраному періоді : " + findSumExpensesPaste;
            }
            if (countCategoryNow.Count() > countCategoryPaste.Count() )
            {
                countCategory = "Кількість категорій більше ніж в обраному періоді! Тепер : " + countCategoryNow.Count() + " > у вибраному періоді : " + countCategoryPaste.Count();
            }
            else
            {
                countCategory = "Кількість категорій більше ніж тепер! Тепер : " + countCategoryNow.Count() + " < у вибраному періоді : " + countCategoryPaste.Count();
            }
            var obj = new
            {

                countExpensesText = countExpensesText,
                sumExpensesText = sumExpensesText,
                countCategory = countCategory
            };
            return Ok(obj);
        }

    }
}
