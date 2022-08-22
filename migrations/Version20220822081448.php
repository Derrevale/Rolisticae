<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220822081448 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE monster (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, pv NUMERIC(5, 0) NOT NULL, pm NUMERIC(3, 0) NOT NULL, loot LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', description LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE monster_skill (monster_id INT NOT NULL, skill_id INT NOT NULL, INDEX IDX_28C5D832C5FF1223 (monster_id), INDEX IDX_28C5D8325585C142 (skill_id), PRIMARY KEY(monster_id, skill_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE monster_skill ADD CONSTRAINT FK_28C5D832C5FF1223 FOREIGN KEY (monster_id) REFERENCES monster (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE monster_skill ADD CONSTRAINT FK_28C5D8325585C142 FOREIGN KEY (skill_id) REFERENCES skill (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE monster_skill DROP FOREIGN KEY FK_28C5D832C5FF1223');
        $this->addSql('ALTER TABLE monster_skill DROP FOREIGN KEY FK_28C5D8325585C142');
        $this->addSql('DROP TABLE monster');
        $this->addSql('DROP TABLE monster_skill');
    }
}
