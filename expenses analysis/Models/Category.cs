using System.ComponentModel.DataAnnotations.Schema;

namespace expenses_analysis.Models
{
    public class Category
    {
        public int id_Category { get; set; }
        public int category_Name { get; set; }
        [ForeignKey("id_Expenses")]
        public Expenses cost { get; set; }
    }
}
