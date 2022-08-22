<?php

namespace App\Entity;

use App\Repository\CampagneRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CampagneRepository::class)
 */
class Campagne
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
     * @ORM\Column(type="string", length=255)
     */
    private $duree;

    /**
     * @ORM\Column(type="decimal", precision=2, scale=0)
     */
    private $nombreJoueur;

    /**
     * @ORM\Column(type="boolean")
     */
    private $status;

    /**
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @ORM\Column(type="boolean")
     */
    private $portfolio;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $file;

    /**
     * @ORM\Column(type="text")
     */
    private $objectif;

    /**
     * @ORM\Column(type="datetime")
     */
    private $dateLancement;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $slug;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="campagnes")
     * @ORM\JoinColumn(nullable=false)
     */
    private $master;

    /**
     * @ORM\ManyToMany(targetEntity=Categorie::class, inversedBy="campagnes")
     */
    private $categorie;

    /**
     * @ORM\OneToMany(targetEntity=Scenario::class, mappedBy="campagne", orphanRemoval=true)
     */
    private $objectifActuel;

    /**
     * @ORM\OneToMany(targetEntity=Personnage::class, mappedBy="campagne", orphanRemoval=true)
     */
    private $player;

    /**
     * @ORM\OneToMany(targetEntity=Commentaire::class, mappedBy="campagne", orphanRemoval=true)
     */
    private $commentaires;

    public function __construct()
    {
        $this->categorie = new ArrayCollection();
        $this->objectifActuel = new ArrayCollection();
        $this->player = new ArrayCollection();
        $this->commentaires = new ArrayCollection();
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

    public function getDuree(): ?string
    {
        return $this->duree;
    }

    public function setDuree(string $duree): self
    {
        $this->duree = $duree;

        return $this;
    }

    public function getNombreJoueur(): ?string
    {
        return $this->nombreJoueur;
    }

    public function setNombreJoueur(string $nombreJoueur): self
    {
        $this->nombreJoueur = $nombreJoueur;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function isPortfolio(): ?bool
    {
        return $this->portfolio;
    }

    public function setPortfolio(bool $portfolio): self
    {
        $this->portfolio = $portfolio;

        return $this;
    }

    public function getFile(): ?string
    {
        return $this->file;
    }

    public function setFile(string $file): self
    {
        $this->file = $file;

        return $this;
    }

    public function getObjectif(): ?string
    {
        return $this->objectif;
    }

    public function setObjectif(string $objectif): self
    {
        $this->objectif = $objectif;

        return $this;
    }

    public function getDateLancement(): ?\DateTimeInterface
    {
        return $this->dateLancement;
    }

    public function setDateLancement(\DateTimeInterface $dateLancement): self
    {
        $this->dateLancement = $dateLancement;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getMaster(): ?User
    {
        return $this->master;
    }

    public function setMaster(?User $master): self
    {
        $this->master = $master;

        return $this;
    }

    /**
     * @return Collection<int, Categorie>
     */
    public function getCategorie(): Collection
    {
        return $this->categorie;
    }

    public function addCategorie(Categorie $categorie): self
    {
        if (!$this->categorie->contains($categorie)) {
            $this->categorie[] = $categorie;
        }

        return $this;
    }

    public function removeCategorie(Categorie $categorie): self
    {
        $this->categorie->removeElement($categorie);

        return $this;
    }

    /**
     * @return Collection<int, Scenario>
     */
    public function getObjectifActuel(): Collection
    {
        return $this->objectifActuel;
    }

    public function addObjectifActuel(Scenario $objectifActuel): self
    {
        if (!$this->objectifActuel->contains($objectifActuel)) {
            $this->objectifActuel[] = $objectifActuel;
            $objectifActuel->setCampagne($this);
        }

        return $this;
    }

    public function removeObjectifActuel(Scenario $objectifActuel): self
    {
        if ($this->objectifActuel->removeElement($objectifActuel)) {
            // set the owning side to null (unless already changed)
            if ($objectifActuel->getCampagne() === $this) {
                $objectifActuel->setCampagne(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Personnage>
     */
    public function getPlayer(): Collection
    {
        return $this->player;
    }

    public function addPlayer(Personnage $player): self
    {
        if (!$this->player->contains($player)) {
            $this->player[] = $player;
            $player->setCampagne($this);
        }

        return $this;
    }

    public function removePlayer(Personnage $player): self
    {
        if ($this->player->removeElement($player)) {
            // set the owning side to null (unless already changed)
            if ($player->getCampagne() === $this) {
                $player->setCampagne(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Commentaire>
     */
    public function getCommentaires(): Collection
    {
        return $this->commentaires;
    }

    public function addCommentaire(Commentaire $commentaire): self
    {
        if (!$this->commentaires->contains($commentaire)) {
            $this->commentaires[] = $commentaire;
            $commentaire->setCampagne($this);
        }

        return $this;
    }

    public function removeCommentaire(Commentaire $commentaire): self
    {
        if ($this->commentaires->removeElement($commentaire)) {
            // set the owning side to null (unless already changed)
            if ($commentaire->getCampagne() === $this) {
                $commentaire->setCampagne(null);
            }
        }

        return $this;
    }
}
