# Rolisticae
Projet TFE : Rolisticae l'outils en ligne du MJ

# Commande Fréquement utilisé

_activation du venv_

    venv\Scripts\activate.bat

_lancement serveur django_

    py manage.py runserver

_lancement serveur react_
    
    npm start

_freeze des requirements django_

    pip freeze > requirements.txt

_Préparation a la migration vers DB django_
    
    py manage.py makemigrations

_Migration des données vers DB django_

    py manage.py migrate 

_Création d'un super User_

    py manage.py createsuperuser

_Installation des requirements Django_

    pip install -r requirements.txt

_Installation des requirements React_

    npm install 

<br>
<br>
---------------------------------------------------------------------------------------------------------------------------------------

### ETAPE 1 Création du Virtual environnement

    py -m venv venv

_Activation du Venv_

    venv\Scripts\activate.bat


### ETAPE 2 Installation de Django et des dépendances

_Installation de django_

    pip install django 

_Pour les textfields améliorer_

    pip install django-ckeditor 

_Pour les Images_

    python -m pip install Pillow

### ETAPE 3 Création du projet
_Création du projet Rolisticae_core Django_

    django-admin startproject Rolisticae_core 

_Mise en place du Manage.py dans le dossier direct_

    django-admin startproject Rolisticae_core . 

### ETAPE 4 Vérification de l'installation et de la création
_Lance le serveur sur le port par défaut (127.0.0.1:8000)_

    py manage.py runserver 

### ETAPE 5 Création de l'app "Blog"

_Création de l'app "blog"_

    django-admin startapp blog 

### ETAPE 6 Ajout de l'apps dans les settings

_Dans le dossier Rolisticae_core dans le fichier settings.py dans la catégorie INSTALED_APPS ajouter_
    
    'blog.apps.BlogConfig',

### ETAPE 7 Création de la classe Category et Article

_Voir fichier models.py dans le dossier blog_

### ETAPE 8 Préparer la migration du modèle vers la database

    py manage.py makemigrations

### ETAPE 9 Migrer les données

    py manage.py migrate

### ETAPE 10 Installation de djangorestframework

    pip install djangorestframework

### ETAPE 11 Ajout de djangorestframework dans les Apps

_Dans le dossier Rolisticae_core dans le fichier settings.py dans la catégorie INSTALED_APPS ajouter_

    'rest_framework',

### ETAPE 12 création du serializers

_Dans le dossier blog créer le fichier serializers.py_

### ETAPE 13 édition du fichier serializers

_Voir le fichier serializers dans le dossier "blog"_

### ETAPE 14 Création de la vue

_Voir le fichier views.py dans le dossier blog_

### ETAPE 15 ajout de le vue dans les URLS

_Ajout du code suivant:_

        from blog.views import CategorysViewset
        from rest_framework.routers import DefaultRouter

        router=DefaultRouter()

        router.register('posts',CategorysViewset)

        path('',include(router.urls))

### ETAPE 16 création du superadmin

    py manage.py createsuperuser

### ETAPE 17 Ajout de category dans l'admin django

_Voir le fichier admin.py dans le dossier blog_

### ETAPE 18 ajout de DRF YAGS

_Allez sur le site_

    https://drf-yasg.readthedocs.io/en/stable/readme.html et mettre Urls.py a jour avec les ajout


### ETAPE 19 installation de drf_yasg

    pip install drf_yasg

### ETAPE 20 ajout de drf_yasg dans les applications

_Dans le fichier settings.py, dans les INSTALLED_APP ajouter_
    
    'drf_yasg',

### ETAPE 21 verification

_Aller sur l'adresse 127.0.0.1:8000/swagger. Si ça s'affiche correctement alors tout est OK_

### ETAPE 22 Installation react

    npx create-react-app rolisticae_client

### ETAPE 23 lancement react

    npm start

### ETAPE 24 suppression src

_Supprimer les fichiers contenu dans src_

### ETAPE 25 création de index.js

_Voir le fichier index.js dans le dossier src_

### ETAPE 26 création du fichier CSS

_Création du fichier main.css_

### ETAPE 27 Installation django corsheader

    pip install django-cors-headers

### ETAPE 28 ajout de Cors-header dans les app installer

_Suivre les instructions donner sur le site web_

### Etape 29 Création du dossiers components dans react
_0_

### ETAPE 30 Ajout de html-react-parser

_Pour nettoyer et afficher du code avec des baslises_
    npm install html-react-parser

### ETAPE 31 ajouter une fonction de nettoyage dans post.js
    
_voir fichier post.js -> cleanedContent_

### ETAPE 32 Ajout de react-router-dom

    npm install react-router-dom
