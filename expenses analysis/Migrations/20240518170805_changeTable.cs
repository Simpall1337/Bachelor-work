using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace expenses_analysis.Migrations
{
    /// <inheritdoc />
    public partial class changeTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_Expenses_id_Expenses",
                table: "Category");

            migrationBuilder.DropIndex(
                name: "IX_Category_id_Expenses",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "id_Expenses",
                table: "Category");

            migrationBuilder.AlterColumn<string>(
                name: "category_Name",
                table: "Category",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "category_Name",
                table: "Category",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "id_Expenses",
                table: "Category",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Category_id_Expenses",
                table: "Category",
                column: "id_Expenses");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_Expenses_id_Expenses",
                table: "Category",
                column: "id_Expenses",
                principalTable: "Expenses",
                principalColumn: "id_Expenses",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
