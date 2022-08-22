<?php

namespace App\Tests;

use App\Entity\Actuality;
use App\Entity\User;
use DateTime;
use PHPUnit\Framework\TestCase;

class ActualityUnitTest extends TestCase
{
    public function testIsTrue()
    {

        $actuality = new Actuality();
        $datetime = new DateTime();
        $auteur = new User();

        $actuality->setTitre("actualité de test")
            ->setContenu("contenu de test")
            ->setDatePubli($datetime)
            ->setAuteur($auteur);

        $this->assertTrue($actuality->getTitre() === "actualité de test");
        $this->assertTrue($actuality->getContenu() === "contenu de test");
        $this->assertTrue($actuality->getDatePubli() === $datetime);
        $this->assertTrue($actuality->getAuteur() === $auteur);
    }

    public function testIsFalse()
    {

        $actuality = new Actuality();
        $datetime = new DateTime();

        $auteur = new User();
        $auteur2 = new User();


        $actuality->setTitre("actualité de test")
            ->setContenu("contenu de test")
            ->setDatePubli($datetime)
            ->setAuteur($auteur);

        $this->assertFalse($actuality->getTitre() === "False");
        $this->assertFalse($actuality->getContenu() === "False");
        $this->assertFalse($actuality->getDatePubli() === "False");
        $this->assertFalse($actuality->getAuteur() === $auteur2);
    }

    public function testIsEmpty()
    {

        $actuality = new Actuality();

        $this->assertEmpty($actuality->getTitre());
        $this->assertEmpty($actuality->getContenu());
        $this->assertEmpty($actuality->getDatePubli());
        $this->assertEmpty($actuality->getAuteur());
    }
}
