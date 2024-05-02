using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace expenses_analysis.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id_User = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    lastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    eMail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    phone = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id_User);
                });

            migrationBuilder.CreateTable(
                name: "Budget",
                columns: table => new
                {
                    id_Budget = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_Budget = table.Column<int>(type: "int", nullable: false),
                    id_User = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Budget", x => x.id_Budget);
                    table.ForeignKey(
                        name: "FK_Budget_Users_id_User",
                        column: x => x.id_User,
                        principalTable: "Users",
                        principalColumn: "id_User",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Expenses",
                columns: table => new
                {
                    id_Expenses = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    amout_money = table.Column<int>(type: "int", nullable: false),
                    date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    id_User = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expenses", x => x.id_Expenses);
                    table.ForeignKey(
                        name: "FK_Expenses_Users_id_User",
                        column: x => x.id_User,
                        principalTable: "Users",
                        principalColumn: "id_User",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Analytics",
                columns: table => new
                {
                    id_Analytics = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MyProperty = table.Column<int>(type: "int", nullable: false),
                    id_User = table.Column<int>(type: "int", nullable: false),
                    id_Expenses = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Analytics", x => x.id_Analytics);
                    table.ForeignKey(
                        name: "FK_Analytics_Expenses_id_Expenses",
                        column: x => x.id_Expenses,
                        principalTable: "Expenses",
                        principalColumn: "id_Expenses",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Analytics_Users_id_User",
                        column: x => x.id_User,
                        principalTable: "Users",
                        principalColumn: "id_User",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    id_Category = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    category_Name = table.Column<int>(type: "int", nullable: false),
                    id_Expenses = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.id_Category);
                    table.ForeignKey(
                        name: "FK_Category_Expenses_id_Expenses",
                        column: x => x.id_Expenses,
                        principalTable: "Expenses",
                        principalColumn: "id_Expenses",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Analytics_id_Expenses",
                table: "Analytics",
                column: "id_Expenses");

            migrationBuilder.CreateIndex(
                name: "IX_Analytics_id_User",
                table: "Analytics",
                column: "id_User");

            migrationBuilder.CreateIndex(
                name: "IX_Budget_id_User",
                table: "Budget",
                column: "id_User");

            migrationBuilder.CreateIndex(
                name: "IX_Category_id_Expenses",
                table: "Category",
                column: "id_Expenses");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_id_User",
                table: "Expenses",
                column: "id_User");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Analytics");

            migrationBuilder.DropTable(
                name: "Budget");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "Expenses");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
