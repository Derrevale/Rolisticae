<?php

namespace App\Tests;

use App\Entity\Categorie;
use PHPUnit\Framework\TestCase;

class CategorieUnitTest extends TestCase
{
    public function testIsTrue()
    {
        $categorie = new Categorie();

        $categorie->setNom("FantasyTest")
            ->setDescription("Une categorie de test")
            ->setSlug("FantasyTest");

        $this->assertTrue($categorie->getNom() === "FantasyTest");
        $this->assertTrue($categorie->getDescription() === "Une categorie de test");
        $this->assertTrue($categorie->getSlug() === "FantasyTest");
    }

    public function testIsFalse()
    {
        $categorie = new Categorie();

        $categorie->setNom("FantasyTest")
            ->setDescription("Une categorie de test")
            ->setSlug("FantasyTest");

        $this->assertFalse($categorie->getNom() === "False");
        $this->assertFalse($categorie->getDescription() === "False");
        $this->assertFalse($categorie->getSlug() === "False");
    }

    public function testIsEmpty()
    {
        $categorie = new Categorie();

        $this->assertEmpty($categorie->getNom());
        $this->assertEmpty($categorie->getDescription());
        $this->assertEmpty($categorie->getSlug());
    }
}
