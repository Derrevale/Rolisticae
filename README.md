# Rolisticae
Projet TFE : Rolisticae l'outils en ligne du MJ


#### ETAPE 1 Création du Virtual environnement

    py -m venv venv

Activation du Venv

    venv\Scripts\activate.bat


#### ETAPE 2 Installation de Django et des dépendance

**Installation de django**

    pip install django 

**Pour les textfields améliorer**

    pip install django-ckeditor 

**Pour les Images**

    python -m pip install Pillow

#### ETAPE 3 Création du projet
**Création du projet Rolisticae_core Django**

    django-admin startproject Rolisticae_core 

**Mise en place du Manage.py dans le dossier direct**

    django-admin startproject Rolisticae_core . 

#### ETAPE 4 Vérification de l'installation et de la création
**Lance le serveur sur le port par défaut (127.0.0.1:8000)**

    py manage.py runserver 

#### ETAPE 5 Création de l'app "Blog"

**Création de l'app "blog"**

    django-admin startapp blog 

#### ETAPE 6 Ajout de l'apps dans les settings

dans le dossier Rolisticae_core dans le fichier settings.py dans la catégorie INSTALED_APPS ajouter 
    
    'blog.apps.BlogConfig',

#### ETAPE 7 Création de la classe Category et Article

voir fichier models.py dans le dossier blog

#### ETAPE 8 Préparer la migration du modèle vers la database

    py manage.py makemigrations

#### ETAPE 9 Migrer les données

    py manage.py migrate

#### ETAPE 10 Installation de djangorestframework

    pip install djangorestframework

#### ETAPE 11 Ajout de djangorestframework dans les Apps

Dans le dossier Rolisticae_core dans le fichier settings.py dans la catégorie INSTALED_APPS ajouter 

    'rest_framework',

#### ETAPE 12 création du serializers

Dans le dossier blog créer le fichier serializers.py

#### ETAPE 13 édition du fichier serializers

voir le fichier serializers dans le dossier "blog"

#### ETAPE 14 Création de la vue

voir le fichier views.py dans le dossier blog

#### ETAPE 15 ajout de le vue dans les URLS

ajout du code suivant:

        from blog.views import CategorysViewset
        from rest_framework.routers import DefaultRouter

        router=DefaultRouter()

        router.register('posts',CategorysViewset)

        path('',include(router.urls))

#### ETAPE 16 création du superadmin

    py manage.py createsuperuser

#### ETAPE 17 Ajout de category dans l'admin django

voir le fichier admin.py dans le dossier blog

#### ETAPE 18 ajout de DRF YAGS

allez sur le site 

    https://drf-yasg.readthedocs.io/en/stable/readme.html et mettre Urls.py a jour avec les ajout


#### ETAPE 19 installation de drf_yasg

    pip install drf_yasg

#### ETAPE 20 ajout de drf_yasg dans les applications

Dans le fichier settings.py, dans les INSTALLED_APP ajouter 
    
    'drf_yasg',

#### ETAPE 21 verification

Aller sur l'adresse 127.0.0.1:8000/swagger. Si ça s'affiche correctement alors tout est OK

#### ETAPE 22

#### ETAPE 23