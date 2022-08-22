<?php

namespace App\Tests;

use DateTime;
use App\Entity\Campagne;
use App\Entity\User;
use App\Entity\Scenario;
use phpDocumentor\Reflection\PseudoTypes\True_;
use PHPUnit\Framework\TestCase;

class ScenarioUnitTest extends TestCase
{
    public function testIsTrue()
    {

        $date = new DateTime();
        $auteur = new User();
        $campagne = new Campagne();
        $newArc = new Scenario();
        $newArc->setAuteur($auteur)
            ->setCampagne($campagne)
            ->setDate($date)
            ->setNom("la phase de test")
            ->setHistoire(" il etait une fois une phase de test")
            ->setStatus(true);

        $this->assertTrue($newArc->getAuteur() === $auteur);
        $this->assertTrue($newArc->getCampagne() === $campagne);
        $this->assertTrue($newArc->getNom() === "la phase de test");
        $this->assertTrue($newArc->getDate() === $date);
        $this->assertTrue($newArc->getHistoire() === " il etait une fois une phase de test");
        $this->assertTrue($newArc->isStatus() === True);
    }

    public function testIsFalse()
    {
        $date = new DateTime();

        $auteur = new User();
        $auteur2 = new User();

        $campagne = new Campagne();
        $campagne2 = new Campagne();

        $newArc = new Scenario();
        $newArc->setAuteur($auteur)
            ->setCampagne($campagne)
            ->setDate($date)
            ->setNom("la phase de test")
            ->setHistoire(" il etait une fois une phase de test")
            ->setStatus(true);

        $this->assertFalse($newArc->getAuteur() === $auteur2);
        $this->assertFalse($newArc->getCampagne() === $campagne2);
        $this->assertFalse($newArc->getNom() === "False");
        $this->assertFalse($newArc->getDate() === "False");
        $this->assertFalse($newArc->getHistoire() === "False");
        $this->assertFalse($newArc->isStatus() === False);
    }

    public function testIsEmpty()
    {

        $newArc = new Scenario();

        $this->assertEmpty($newArc->getAuteur());
        $this->assertEmpty($newArc->getCampagne());
        $this->assertEmpty($newArc->getNom());
        $this->assertEmpty($newArc->getDate());
        $this->assertEmpty($newArc->getHistoire());
    }
}
