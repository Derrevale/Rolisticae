<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220821134211 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE campagne_categorie (campagne_id INT NOT NULL, categorie_id INT NOT NULL, INDEX IDX_CD9B7B2A16227374 (campagne_id), INDEX IDX_CD9B7B2ABCF5E72D (categorie_id), PRIMARY KEY(campagne_id, categorie_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE campagne_categorie ADD CONSTRAINT FK_CD9B7B2A16227374 FOREIGN KEY (campagne_id) REFERENCES campagne (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE campagne_categorie ADD CONSTRAINT FK_CD9B7B2ABCF5E72D FOREIGN KEY (categorie_id) REFERENCES categorie (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE campagne ADD master_id INT NOT NULL');
        $this->addSql('ALTER TABLE campagne ADD CONSTRAINT FK_539B5D1613B3DB11 FOREIGN KEY (master_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_539B5D1613B3DB11 ON campagne (master_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE campagne_categorie DROP FOREIGN KEY FK_CD9B7B2A16227374');
        $this->addSql('ALTER TABLE campagne_categorie DROP FOREIGN KEY FK_CD9B7B2ABCF5E72D');
        $this->addSql('DROP TABLE campagne_categorie');
        $this->addSql('ALTER TABLE campagne DROP FOREIGN KEY FK_539B5D1613B3DB11');
        $this->addSql('DROP INDEX IDX_539B5D1613B3DB11 ON campagne');
        $this->addSql('ALTER TABLE campagne DROP master_id');
    }
}
