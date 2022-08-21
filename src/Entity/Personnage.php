<?php

namespace App\Entity;

use App\Repository\PersonnageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PersonnageRepository::class)
 */
class Personnage
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
    private $prenom;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nom;

    /**
     * @ORM\Column(type="decimal", precision=5, scale=0)
     */
    private $PV;

    /**
     * @ORM\Column(type="decimal", precision=5, scale=0)
     */
    private $MP;

    /**
     * @ORM\Column(type="array")
     */
    private $inventaire = [];

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $description;

    /**
     * @ORM\ManyToMany(targetEntity=Skill::class, inversedBy="personnages")
     */
    private $competences;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="personnages")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="boolean")
     */
    private $status;

    public function __construct()
    {
        $this->competences = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
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

    public function getMP(): ?string
    {
        return $this->MP;
    }

    public function setMP(string $MP): self
    {
        $this->MP = $MP;

        return $this;
    }

    public function getInventaire(): ?array
    {
        return $this->inventaire;
    }

    public function setInventaire(array $inventaire): self
    {
        $this->inventaire = $inventaire;

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
    public function getCompetences(): Collection
    {
        return $this->competences;
    }

    public function addCompetence(Skill $competence): self
    {
        if (!$this->competences->contains($competence)) {
            $this->competences[] = $competence;
        }

        return $this;
    }

    public function removeCompetence(Skill $competence): self
    {
        $this->competences->removeElement($competence);

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function isStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }
}
