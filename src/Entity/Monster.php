<?php

namespace App\Entity;

use App\Repository\MonsterRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MonsterRepository::class)
 */
class Monster
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nom;

    /**
     * @ORM\Column(type="decimal", precision=5, scale=0)
     */
    private $PV;

    /**
     * @ORM\Column(type="decimal", precision=3, scale=0)
     */
    private $PM;

    /**
     * @ORM\Column(type="array")
     */
    private $loot = [];

    /**
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @ORM\ManyToMany(targetEntity=Skill::class, inversedBy="monsters")
     */
    private $competence;

    public function __construct()
    {
        $this->competence = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPV(): ?string
    {
        return $this->PV;
    }

    public function setPV(string $PV): self
    {
        $this->PV = $PV;

        return $this;
    }

    public function getPM(): ?string
    {
        return $this->PM;
    }

    public function setPM(string $PM): self
    {
        $this->PM = $PM;

        return $this;
    }

    public function getLoot(): ?array
    {
        return $this->loot;
    }

    public function setLoot(array $loot): self
    {
        $this->loot = $loot;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Skill>
     */
    public function getCompetence(): Collection
    {
        return $this->competence;
    }

    public function addCompetence(Skill $competence): self
    {
        if (!$this->competence->contains($competence)) {
            $this->competence[] = $competence;
        }

        return $this;
    }

    public function removeCompetence(Skill $competence): self
    {
        $this->competence->removeElement($competence);

        return $this;
    }
}
