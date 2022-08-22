<?php

namespace App\Tests;

use DateTime;
use App\Entity\Campagne;
use App\Entity\User;
use App\Entity\Commentaire;
use PHPUnit\Framework\TestCase;

class CommentaireUnitTest extends TestCase
{
    public function testIsTrue()
    {
        $date = new DateTime();
        $user = new User();
        $campagne = new Campagne();
        $commentaire = new Commentaire();
        $commentaire->setAuteur($user)
            ->setCampagne($campagne)
            ->setContenu("il etait une fois l'histoire d'un test")
            ->setDate($date);

        $this->assertTrue($commentaire->getAuteur() === $user);
        $this->assertTrue($commentaire->getCampagne() === $campagne);
        $this->assertTrue($commentaire->getContenu() === "il etait une fois l'histoire d'un test");
        $this->assertTrue($commentaire->getDate() === $date);
    }

    public function testIsFalse()
    {

        $date = new DateTime();

        $user = new User();
        $user2 = new User();

        $campagne = new Campagne();
        $campagne2 = new Campagne();

        $commentaire = new Commentaire();
        $commentaire->setAuteur($user)
            ->setCampagne($campagne)
            ->setContenu("c'était bien !")
            ->setDate($date);

        $this->assertFalse($commentaire->getAuteur() === $user2);
        $this->assertFalse($commentaire->getCampagne() === $campagne2);
        $this->assertFalse($commentaire->getContenu() === "False");
        $this->assertFalse($commentaire->getDate() === "False");
    }

    public function testIsEmpty()
    {

        $commentaire = new Commentaire();

        $this->assertEmpty($commentaire->getAuteur());
        $this->assertEmpty($commentaire->getCampagne());
        $this->assertEmpty($commentaire->getContenu());
        $this->assertEmpty($commentaire->getDate());
    }
}
