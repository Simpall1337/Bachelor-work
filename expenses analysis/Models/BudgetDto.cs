using System.ComponentModel.DataAnnotations.Schema;

namespace expenses_analysis.Models
{
    public class BudgetDto
    {
        public int id_Budget { get; set; }
        public int user_Budget { get; set; }
        public int id_User { get; set; }
    }
}
