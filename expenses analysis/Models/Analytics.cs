using System.ComponentModel.DataAnnotations.Schema;

namespace expenses_analysis.Models
{
    public class Analytics
    {
        public int id_Analytics { get; set; }
        public int MyProperty { get; set; }
        [ForeignKey("id_User")]
        public Users User { get; set; }

        [ForeignKey("id_Expenses")]
        public Expenses cost { get; set; }
    }
}
