using System.ComponentModel.DataAnnotations.Schema;

namespace expenses_analysis.Models
{
    public class Category
    {
        public int id_Category { get; set; }
        public string category_Name { get; set; }
    }
}
