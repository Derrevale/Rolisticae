<?php

namespace App\Tests;

use App\Entity\Skill;
use App\Entity\Monster;
use PHPUnit\Framework\TestCase;

class MonsterUnitTest extends TestCase
{
    public function testIstrue()
    {
        $monster = new Monster();
        $competence = new Skill();


        $monster->setNom("GobelinTest")
            ->setPV(10)
            ->setPM(10)
            ->setLoot(["vielle dague", "morceau de tissus"])
            ->addCompetence($competence)
            ->setDescription("créature verte et petite créer pour servir de test");

        $this->assertTrue($monster->getNom() === "GobelinTest");
        $this->assertTrue($monster->getPV() === "10");
        $this->assertTrue($monster->getPM() === "10");
        $this->assertTrue($monster->getLoot() === ["vielle dague", "morceau de tissus"]);
        $this->assertContains($competence, $monster->getCompetence());
        $this->assertTrue($monster->getDescription() === "créature verte et petite créer pour servir de test");
    }

    public function testIsFalse()
    {
        $monster = new Monster();
        $competence = new Skill();


        $monster->setNom("GobelinTest")
            ->setPV(10)
            ->setPM(10)
            ->setLoot(["vielle dague", "morceau de tissus"])
            ->setDescription("créature verte et petite créer pour servir de test");

        $this->assertFalse($monster->getNom() === "False");
        $this->assertFalse($monster->getPV() === "False");
        $this->assertFalse($monster->getPM() === "False");
        $this->assertFalse($monster->getLoot() === ["False", "False"]);
        $this->assertNotContains($competence, $monster->getCompetence());
        $this->assertFalse($monster->getDescription() === "False");
    }

    public function testIsEmpty()
    {

        $monster = new Monster();

        $this->assertEmpty($monster->getNom());
        $this->assertEmpty($monster->getDescription());
        $this->assertEmpty($monster->getLoot());
        $this->assertEmpty($monster->getPV());
        $this->assertEmpty($monster->getPM());
        $this->assertEmpty($monster->getCompetence());
    }
}
