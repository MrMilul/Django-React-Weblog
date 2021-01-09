from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify


class Categories(models.TextChoices):
        WORLD = 'world'
        TECHNOLOGY = 'thechnology'
        SCIENCE = 'science'


class Months(models.TextChoices):
    JAN = 'jan'
    FEB = 'feb'
    MAR = 'mar'
    APR = 'apr'
    MAY = 'may'
    JUN = 'jun'
    JUL = 'jul'
    AUG = 'aug'
    SEP = 'sep'
    OCT = 'oct'
    NOV = 'nov'
    DEC = 'dec'


class Days(models.TextChoices):
    MON = 'mon'
    TUE = 'tue'
    WED = 'wed'
    THU = 'thu'
    FRI = 'fri'
    SAT = 'sat'
    SUN = 'sun'


class BlogPost(models.Model):
    title = models.CharField(max_length=50)
    slug = models.SlugField()
    category = models.CharField(max_length=50, choices=Categories.choices, default=Categories.WORLD)
    thumbnail = models.ImageField(upload_to='photos/%Y/%m/%d')
    excerpt = models.CharField(max_length=50)
    month = models.CharField(max_length=3, choices=Months.choices, default=Months.JAN)
    day = models.CharField(max_length=3, choices=Days.choices, default=Days.MON)
    context = models.TextField()
    featured = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=datetime.now, blank=True)

    def save(self, *args, **kwargs):
        original_slug = slugify(self.title)
        queryset = BlogPost.objects.all().filter(slug__iexact=original_slug).count()

        count = 1
        slug = original_slug
        while queryset:
            slug = original_slug + ' ' + str(count)
            count += 1
            queryset = BlogPost.objects.all().filter(slug__iexact=slug).count()

        self.slug = slug

        if self.featured:
            try:
                temp = BlogPost.objects.get(featured=True)
                if self != temp:
                    temp.featured = False
                    temp.save()
            except BlogPost.DoesNotExist:
                pass

        super(BlogPost, self).save(self, *args, *kwargs)

    def __str__(self):
        return self.title




