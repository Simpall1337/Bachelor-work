using System.ComponentModel.DataAnnotations.Schema;

namespace expenses_analysis.Models
{
    public class Budget
    {
        public int id_Budget { get; set; }
        public int user_Budget { get; set; }
        [ForeignKey("id_User")]
        public Users User { get; set; }
    }
}
