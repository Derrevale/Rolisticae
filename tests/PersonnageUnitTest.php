<?php

namespace App\Tests;

use App\Entity\Skill;
use App\Entity\User;
use App\Entity\Personnage;
use phpDocumentor\Reflection\PseudoTypes\False_;
use PHPUnit\Framework\TestCase;

class PersonnageUnitTest extends TestCase
{
    public function testIstrue()
    {
        $user = new User();
        $competence = new Skill();
        $personnage = new Personnage();



        $personnage->setPrenom("veldaryn")
            ->setNom("koda")
            ->setDescription("elfe noir encapuchonné avec de long cheveux blanc")
            ->setInventaire(["3 corde", "2 dagues"])
            ->setPV(10)
            ->setMP(5)
            ->addCompetence($competence)
            ->setStatus(true)
            ->setUser($user);

        $this->assertTrue($personnage->getNom() === "koda");
        $this->assertTrue($personnage->getPrenom() === "veldaryn");
        $this->assertTrue($personnage->getDescription() === "elfe noir encapuchonné avec de long cheveux blanc");
        $this->assertTrue($personnage->getInventaire() === ["3 corde", "2 dagues"]);
        $this->assertTrue($personnage->getPV() === "10");
        $this->assertTrue($personnage->getMP() === "5");
        $this->assertContains($competence, $personnage->getCompetences());
        $this->assertTrue($personnage->isStatus() === true);
        $this->assertTrue($personnage->getUser() === $user);
    }

    public function testIsfalse()
    {
        $personnage = new Personnage();
        $competence = new Skill();

        $user = new User();
        $user2 = new User();

        $personnage->setPrenom("veldaryn")
            ->setNom("koda")
            ->setDescription("elfe noir encapuchonné avec de long cheveux blanc")
            ->setInventaire(["3 corde", "2 dagues"])
            ->setPV(10)
            ->setMP(5)
            ->setStatus(true)
            ->setUser($user);


        $this->assertFalse($personnage->getNom() === "False");
        $this->assertFalse($personnage->getPrenom() === "False");
        $this->assertFalse($personnage->getDescription() === "False");
        $this->assertFalse($personnage->getInventaire() === ["False", "False"]);
        $this->assertFalse($personnage->getPV() === "False");
        $this->assertFalse($personnage->getMP() === "False");
        $this->assertNotContains($competence, $personnage->getCompetences());
        $this->assertFalse($personnage->isStatus() === False);
        $this->assertFalse($personnage->getUser() === $user2);
    }

    public function testIsEmpty()
    {

        $personnage = new Personnage();

        $this->assertEmpty($personnage->getNom());
        $this->assertEmpty($personnage->getPrenom());
        $this->assertEmpty($personnage->getDescription());
        $this->assertEmpty($personnage->getInventaire());
        $this->assertEmpty($personnage->getPV());
        $this->assertEmpty($personnage->getMP());
        $this->assertEmpty($personnage->getCompetences());
        $this->assertEmpty($personnage->getUser());
        $this->assertEmpty($personnage->isStatus());
    }
}
