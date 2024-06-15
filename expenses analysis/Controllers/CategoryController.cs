using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace expenses_analysis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly DataBaseContext db;

        public CategoryController(DataBaseContext dbContext)
        {
            db = dbContext;
        }

        [HttpGet]
        public IActionResult GetCategoryList()
        {
            return Ok(db.Category.Select(x => x.category_Name));
        }
    }
}
