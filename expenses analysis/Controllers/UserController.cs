using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using expenses_analysis.Models;
using Microsoft.AspNetCore.Authorization;

namespace expenses_analysis.Controllers
{
    [Route("user")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        [HttpPost]
        public IActionResult Create(Users user)
        {
          
            return Ok();
        }
        [HttpGet]
        public IActionResult Login()
        {
            return Ok();
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
