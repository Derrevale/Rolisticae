<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220821163722 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE personnage (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, prenom VARCHAR(255) NOT NULL, nom VARCHAR(255) NOT NULL, pv NUMERIC(5, 0) NOT NULL, mp NUMERIC(5, 0) NOT NULL, inventaire LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', description VARCHAR(255) NOT NULL, status TINYINT(1) NOT NULL, INDEX IDX_6AEA486DA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE personnage_skill (personnage_id INT NOT NULL, skill_id INT NOT NULL, INDEX IDX_F46EE84D5E315342 (personnage_id), INDEX IDX_F46EE84D5585C142 (skill_id), PRIMARY KEY(personnage_id, skill_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE personnage ADD CONSTRAINT FK_6AEA486DA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE personnage_skill ADD CONSTRAINT FK_F46EE84D5E315342 FOREIGN KEY (personnage_id) REFERENCES personnage (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE personnage_skill ADD CONSTRAINT FK_F46EE84D5585C142 FOREIGN KEY (skill_id) REFERENCES skill (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE personnage DROP FOREIGN KEY FK_6AEA486DA76ED395');
        $this->addSql('ALTER TABLE personnage_skill DROP FOREIGN KEY FK_F46EE84D5E315342');
        $this->addSql('ALTER TABLE personnage_skill DROP FOREIGN KEY FK_F46EE84D5585C142');
        $this->addSql('DROP TABLE personnage');
        $this->addSql('DROP TABLE personnage_skill');
    }
}
