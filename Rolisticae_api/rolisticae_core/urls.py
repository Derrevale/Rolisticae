from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.static import serve
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

import documents.views
from blog.views import ArticlesViewset
from blog.views import CategorysViewset
from calendrier.views import CalendarysViewset
from calendrier.views import EventViewset
from documents.views import CategoryDocumentViewSet
from documents.views import DocumentViewSet
from galerie.views import Category_Galerie_ListView, Category_Galerie_DetailView, Image_Galerie_ListView, \
    Image_Galerie_DetailView, Category_Galerie_ViewSet, \
    Image_Galerie_ViewSet
from appointment.views import AppointmentViewSet, VoteViewSet
from users.views import RegisterView  # Assurez-vous de remplacer 'users' par le nom correct de votre application

schema_view = get_schema_view(
    openapi.Info(
        title="Rolisticae API",
        default_version='v1',
        description="Api de Rolisticae , "
                    "Cette API permet de gérer les données de Rolisticae, "
                    "<br> Elle permet de gérer les données des applications suivantes : "
                    "<ul>"
                    "<li>Calendrier d'événement ( calendrier et événement )</li>"
                    "<li> Gestionnaire de fichier ( catégorie et fichier )</li>"
                    "<li> Galerie d' images ( catégorie et image )</li>"
                    "<li> Blog ( catégorie et article )</li>"
                    "<li> Outils de recherche ( documents )</li>"
                    "</ul>",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

router = DefaultRouter()

router.register('Blog Categorie', CategorysViewset)
router.register('Blog Article', ArticlesViewset)

router.register('EventManager Calendrier ', CalendarysViewset)
router.register('EventManager Event', EventViewset)

router.register('FileManager Categorie', CategoryDocumentViewSet)
router.register('FileManager File', DocumentViewSet)

router.register('Galerie Categorie', Category_Galerie_ViewSet)
router.register('Galerie Image', Image_Galerie_ViewSet)

# Les nouvelles routes pour l'API des rendez-vous et des votes
router.register('Appointment Date', AppointmentViewSet)
router.register('Appointment Vote', VoteViewSet)

urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('api/', include(router.urls)),
                  path('api/register/', RegisterView.as_view(), name='register'),  # nouvelle ligne ajoutée ici
                  path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
                  path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
                  path('images/<str:path>', serve, {'document_root': settings.MEDIA_ROOT}),
                  path('api/search/', documents.views.SearchView.as_view(), name='search'),
                  path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
                  path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
