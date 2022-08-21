<?php

namespace App\Tests;

use App\Entity\Categorie;
use App\Entity\User;
use App\Entity\Campagne;
use DateTime;
use PHPUnit\Framework\TestCase;

class CampagneUnitTest extends TestCase
{
    public function testIsTrue()
    {
        $campagne = new Campagne();
        $datetime = new DateTime();
        $categorie1 = new Categorie();
        $categorie2 = new Categorie();
        $user = new User();

        $campagne->setNom("CampagneDeTest")
            ->setDuree("6 sessions")
            ->setNombreJoueur(3)
            ->setStatus(true)
            ->setDateLancement($datetime)
            ->setMaster($user)
            ->setDescription("Une campagne de test")
            ->setPortfolio(true)
            ->setFile("file")
            ->setObjectif("objectif final de la campagne")
            ->setSlug("CampagneTest")
            ->addCategorie($categorie1)
            ->addCategorie($categorie2);


        $this->assertTrue($campagne->getNom() === "CampagneDeTest");
        $this->assertTrue($campagne->getDuree() === "6 sessions");
        $this->assertTrue($campagne->getNombreJoueur() === "3");
        $this->assertTrue($campagne->isStatus() === true);
        $this->assertTrue($campagne->getDateLancement() === $datetime);
        $this->assertTrue($campagne->getMaster() === $user);
        $this->assertTrue($campagne->getDescription() === "Une campagne de test");
        $this->assertTrue($campagne->isPortfolio() === true);
        $this->assertTrue($campagne->getFile() === "file");
        $this->assertTrue($campagne->getObjectif() === "objectif final de la campagne");
        $this->assertTrue($campagne->getSlug() === "CampagneTest");
        $this->assertContains($categorie1, $campagne->getCategorie());
        $this->assertContains($categorie2, $campagne->getCategorie());
    }

    public function testIsFalse()
    {
        $campagne = new Campagne();
        $datetime = new DateTime();
        $categorie1 = new Categorie();
        $categorie2 = new Categorie();
        $user = new User();

        $campagne->setNom("CampagneDeTest")
            ->setDuree("6 sessions")
            ->setNombreJoueur(3)
            ->setStatus(true)
            ->setDateLancement($datetime)
            ->setMaster($user)
            ->setDescription("Une campagne de test")
            ->setPortfolio(true)
            ->setFile("file")
            ->setObjectif("objectif final de la campagne")
            ->setSlug("CampagneTest")
            ->addCategorie($categorie1);


        $this->assertFalse($campagne->getNom() === "False");
        $this->assertFalse($campagne->getDuree() === "False");
        $this->assertFalse($campagne->getNombreJoueur() === "False");
        $this->assertFalse($campagne->isStatus() === False);
        $this->assertFalse($campagne->getDateLancement() === "False");
        $this->assertFalse($campagne->getMaster() === "False");
        $this->assertFalse($campagne->getDescription() === "False");
        $this->assertFalse($campagne->isPortfolio() === False);
        $this->assertFalse($campagne->getFile() === "False");
        $this->assertFalse($campagne->getObjectif() === "False");
        $this->assertFalse($campagne->getSlug() === "False");
        $this->assertNotContains($categorie2, $campagne->getCategorie());
    }

    public function testIsEmpty()
    {
        $campagne = new Campagne();


        $this->assertEmpty($campagne->getNom());
        $this->assertEmpty($campagne->getDuree());
        $this->assertEmpty($campagne->getNombreJoueur());
        $this->assertEmpty($campagne->isStatus());
        $this->assertEmpty($campagne->getDateLancement());
        $this->assertEmpty($campagne->getMaster());
        $this->assertEmpty($campagne->getDescription());
        $this->assertEmpty($campagne->isPortfolio());
        $this->assertEmpty($campagne->getFile());
        $this->assertEmpty($campagne->getObjectif());
        $this->assertEmpty($campagne->getSlug());
        $this->assertEmpty($campagne->getCategorie());
    }
}
