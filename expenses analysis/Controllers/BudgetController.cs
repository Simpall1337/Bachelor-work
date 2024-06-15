using expenses_analysis.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace expenses_analysis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetController : ControllerBase
    {
        private readonly DataBaseContext db;

        public BudgetController(DataBaseContext dbContext)
        {
            db = dbContext;
        }
        [HttpPatch] 
        public IActionResult changeBudget(int newBudget,int idUser)
        {
            var budget = db.Budget.SingleOrDefault(x => x.User.id_User == idUser);
            if (budget != null)
            {
                budget.user_Budget = newBudget;
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
