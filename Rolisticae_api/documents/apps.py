# Importation des modules nécessaires
from django.apps import AppConfig  # Pour la configuration de l'application

# Classe pour la configuration de l'application
class MyAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'  # Définition du champ auto par défaut
    name = 'documents'  # Nom de l'application

    def ready(self):
        """
        Cette méthode est appelée lorsque l'application est prête à être utilisée.
        """

        try:
            # Importation ici pour éviter les importations circulaires (et les insultes à l'exécution)
            import documents.models as models  # Importation des modèles
            import documents.services as services  # Importation des services
            from rolisticae_core.settings import logger  # Importation du logger

            # Initialisation de quelques variables de travail
            counter = 0  # Compteur de documents traités
            errors = 0  # Compteur d'erreurs

            # Boucle sur les documents non traités
            for document in models.Document.objects.filter(processed=False).all():
                try:
                    # Traitement du document
                    services.rolisticae_search_service.process(document)
                    # Marquage du document comme traité
                    document.processed = True
                    # Sauvegarde du document
                    document.save()
                    # Incrémentation du compteur
                    counter += 1
                except Exception as e:  # En cas d'erreur lors du traitement d'un document
                    logger.error(f'Erreur lors du traitement du document {document.name}: {e}')  # Log de l'erreur
                    errors += 1  # Incrémentation du compteur d'erreurs

            logger.info(f'{counter} documents traités avec {errors} erreurs.')  # Log du nombre de documents traités et d'erreurs

        except Exception as e:  # En cas d'erreur globale
            from rolisticae_core.settings import logger  # Importation du logger
            logger.error(f'Erreur: {e}')  # Log de l'erreur
