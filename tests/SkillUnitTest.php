<?php

namespace App\Tests;

use App\Entity\Skill;
use PHPUnit\Framework\TestCase;

class SkillUnitTest extends TestCase
{
    public function testIsTrue()
    {

        $skill = new Skill();

        $skill->setNom("Coup de test")
            ->setDescription("coup permettant de verifier si le test fonctionne")
            ->setCout(2)
            ->setDice("1d6")
            ->setNiveau(1);

        $this->assertTrue($skill->getNom() === "Coup de test");
        $this->assertTrue($skill->getDescription() === "coup permettant de verifier si le test fonctionne");
        $this->assertTrue($skill->getCout() === "2");
        $this->assertTrue($skill->getDice() === "1d6");
        $this->assertTrue($skill->getNiveau() === "1");
    }

    public function testIsFalse()
    {

        $skill = new Skill();

        $skill->setNom("Coup de test")
            ->setDescription("coup permettant de verifier si le test fonctionne")
            ->setCout(2)
            ->setDice("1d6")
            ->setNiveau(1);

        $this->assertFalse($skill->getNom() === "False");
        $this->assertFalse($skill->getDescription() === "False");
        $this->assertFalse($skill->getCout() === "False");
        $this->assertFalse($skill->getDice() === "False");
        $this->assertFalse($skill->getNiveau() === "False");
    }

    public function testIsEmpty()
    {

        $skill = new Skill();

        $this->assertEmpty($skill->getNom());
        $this->assertEmpty($skill->getDescription());
        $this->assertEmpty($skill->getCout());
        $this->assertEmpty($skill->getDice());
        $this->assertEmpty($skill->getNiveau());
    }
}
