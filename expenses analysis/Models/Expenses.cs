using System.ComponentModel.DataAnnotations.Schema;

namespace expenses_analysis.Models
{
    public class Expenses
    {
        public int id_Expenses { get; set; }
        public string category { get; set; }
        public int amout_money { get; set; }
        public DateTime date { get; set; }
        public string description { get; set; }

        [ForeignKey("id_User")]
        public Users User { get; set; }
    }
}
