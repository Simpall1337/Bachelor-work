using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using expenses_analysis.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace expenses_analysis.Controllers
{
    [Route("user")]
    [ApiController]
    //[Authorize]
    public class UserController : ControllerBase
    {
        private readonly DataBaseContext db;

        public UserController(DataBaseContext dbContext)
        {
            db = dbContext;
        }

        [HttpPost]
        public IActionResult Create(Users user)
        {
            try
            {
                db.Users.Add(user);
                db.SaveChanges();
                var findUser = db.Users.FirstOrDefault(x => x.login == user.login);
                var add = new Budget
                {
                    User = findUser,
                    user_Budget = 0
                };
                db.Budget.Add(add);
                db.SaveChanges();
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
                throw;
            }

        }
        [HttpGet]
        public IActionResult Login(string login,string password)
        {
            var find = db.Users.FirstOrDefault(find => find.login == login && find.password == password);
            if (find == null)
            {
                return BadRequest("Не правильний логiн чи пароль");
            }
            return Ok(find);
        }
        [HttpPatch]
        public IActionResult Change()
        {
            return Ok();
        }
        [HttpDelete]
        public IActionResult Delete()
        {
            return Ok();
        }
    }
}
