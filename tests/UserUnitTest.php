<?php

namespace App\Tests;

use App\Entity\User;
use PHPUnit\Framework\TestCase;

class UserUnitTest extends TestCase
{
    public function testIsTrue()
    {
        $user = new User();

        $user->setEmail("test@true.be")
            ->setPrenom("Valentin")
            ->setNom("Derreumaux")
            ->setPseudo("Shind0ka")
            ->setPassword("Str0ngP@ssw0rd")
            ->setAPropos("Un user de test c'est tout ce que je suis?")
            ->setGSM("01 23 45 67 89");

        $this->assertTrue($user->getEmail() === "test@true.be");
        $this->assertTrue($user->getPrenom() === "Valentin");
        $this->assertTrue($user->getNom() === "Derreumaux");
        $this->assertTrue($user->getPseudo() === "Shind0ka");
        $this->assertTrue($user->getPassword() === "Str0ngP@ssw0rd");
        $this->assertTrue($user->getAPropos() === "Un user de test c'est tout ce que je suis?");
        $this->assertTrue($user->getGSM() === "01 23 45 67 89");
    }

    public function testIsFalse()
    {
        $user = new User();

        $user->setEmail("test@true.be")
            ->setPrenom("Valentin")
            ->setNom("Derreumaux")
            ->setPseudo("Shind0ka")
            ->setPassword("Str0ngP@ssw0rd")
            ->setAPropos("Un user de test c'est tout ce que je suis?")
            ->setGSM("01 23 45 67 89");

        $this->assertFalse($user->getEmail() === "False");
        $this->assertFalse($user->getPrenom() === "False");
        $this->assertFalse($user->getNom() === "False");
        $this->assertFalse($user->getPseudo() === "False");
        $this->assertFalse($user->getPassword() === "False");
        $this->assertFalse($user->getAPropos() === "False");
        $this->assertFalse($user->getGSM() === "False");
    }

    public function testassertEmpty()
    {
        $user = new User();

        $this->assertEmpty($user->getEmail());
        $this->assertEmpty($user->getPrenom());
        $this->assertEmpty($user->getNom());
        $this->assertEmpty($user->getPseudo());
        $this->assertEmpty($user->getAPropos());
        $this->assertEmpty($user->getGSM());
    }
}
