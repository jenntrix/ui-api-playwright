import { expect, test } from '@playwright/test';
import { ApiClient } from '../../apiClients/apiClients';
import { ApiService } from '../../apiServices/apiServices';

test.describe('Disney API Tests', () => { 
    let apiClient;
    let apiService;
    let responseBody;
    let response;
    let info;
    let id;

    test.beforeEach(async ({ request }) => {  
       apiClient = new ApiClient(request, process.env.API_BASE_URL);
       apiService = new ApiService(request, process.env.API_BASE_URL);
    });

    test('TC-API-001 - Retrieve characters successfully', async ({ request }) => {
        await test.step('Get all Disney characters', async () => {
            response = await apiService.getAllCharacters();

        });
        
        await test.step('Verify status and header', async () => {
            responseBody = await response.json();
            expect(response.status()).toBe(200);
            expect(response.ok()).toBeTruthy();
            expect(response.headers()['content-type']).toContain('application/json');
        });

        await test.step('Verify response structure', async () => {
            expect(responseBody).toEqual(
            expect.objectContaining({info: await expect.any(Object), data: await expect.any(Array)}));
        });
    });

    test('TC-API-002 — Validate character response structure', async ({ request }) => {

        await test.step('Get all Disney characters', async () => { 
            response = await apiService.getAllCharacters();
            expect(response.status()).toBe(200);
            expect(response.ok()).toBeTruthy();
        });

        await test.step('Verify that characters were returned', async () => { 
            responseBody = await response.json();
            expect(responseBody.data.length).toBeGreaterThan(0);
        });

        await test.step('Verify character fields and data types', async () => { 
            const character = responseBody.data[0];
            expect(character).toEqual(
                expect.objectContaining({
                    _id: expect.any(Number),
                    name: expect.any(String),
                    films: expect.any(Array),
                    shortFilms: expect.any(Array),
                    tvShows: expect.any(Array),
                    videoGames: expect.any(Array),
                    parkAttractions: expect.any(Array),
                    allies: expect.any(Array),
                    enemies: expect.any(Array),
                    url: expect.any(String),
            }))
        });    
    });

    test('TC-API-003 — Validate pagination with page and pageSize', async ({ request }) => {
        const page = 1;
        const pageSize = 10;

        await test.step('Get characters by page and page size', async () => {
            response = await apiService.getCharacterByPageSize(page, pageSize);
        });

        await test.step('Verify response status and success', async () => {
            expect(response.status()).toBe(200);
            expect(response.ok()).toBeTruthy();
        });

        await test.step('Verify the number of returned characters', async () => {
            responseBody = await response.json();
            expect(Array.isArray(responseBody.data)).toBeTruthy();
            expect(responseBody.data.length).toBeGreaterThan(0);
            expect(responseBody.data.length).toBeLessThanOrEqual(pageSize);
    });

        await test.step('Verify pagination information', async () => {
            info = responseBody.info;

            expect(info).toEqual(
                expect.objectContaining({
                    count: expect.any(Number),
                    totalPages: expect.any(Number),
                })
            );

            expect(info).toHaveProperty('nextPage');
            expect(info).toHaveProperty('previousPage');

            expect(info.count).toBeGreaterThan(0);
            expect(info.totalPages).toBeGreaterThan(0);
        });

        await test.step('Verify navigation for the first page', async () => {
            info = responseBody.info;

            expect(info.previousPage).toBeNull();

            if (info.totalPages > 1) {
                expect(info.nextPage).not.toBeNull();
                expect(typeof info.nextPage).toBe('string');
            }
        });
    });

    test('TC-API-004 — Filter characters by TV show', async ({ request }) => {
        const tvShows = 'Jake and the Never Land Pirates';
        
         await test.step('Get characters by tv show', async () => {
            response = await apiService.getCharacterByTvShow(tvShows);
        });

        await test.step('Verify response status and success', async () => {
            expect(response.status()).toBe(200);
            expect(response.ok()).toBeTruthy();
        });

        await test.step('Verify that characters were returned', async () => {
            responseBody = await response.json();
            expect(Array.isArray(responseBody.data)).toBeTruthy();
            expect(responseBody.data.length).toBeGreaterThan(0);
    });

        await test.step('Verify that all returned characters are from the specified TV show', async () => {
            const characters = responseBody.data;
            for (const character of characters) {
                expect(character.tvShows).toContain(tvShows);
            }
        });
    });

    test('TC-API-005 — Filter characters by video game', async ({ request }) => { 
        const videoGames = 'Kingdom Hearts III';
        
         await test.step('Get characters by video game', async () => {
            response = await apiService.getCharacterByVideoGames(videoGames);
        });

        await test.step('Verify response status and success', async () => {
            expect(response.status()).toBe(200);
            expect(response.ok()).toBeTruthy();
        });

        await test.step('Verify that characters were returned', async () => {
            responseBody = await response.json();
            expect(Array.isArray(responseBody.data)).toBeTruthy();
            expect(responseBody.data.length).toBeGreaterThan(0);
    });

        await test.step('Verify that all returned characters are from the specified video game', async () => {
            const characters = responseBody.data;
            for (const character of characters) {
                expect(character.videoGames).toContain(videoGames);
            }
        });

    });

    test('TC-API-006 — Invalid endpoint', async ({ request }) => { 
        await test.step('Request an invalid endpoint', async () => {
        response = await apiService.getInvalidEndpoint();
        });

        await test.step('Verify HTTP error status', async () => {
            expect(response.ok()).toBeFalsy();
            expect(response.status()).toBe(404);
        });

        await test.step('Verify response structure validation on error response', async () => {
            responseBody = await response.text();
            expect(typeof responseBody).toBe('string');
            expect(responseBody.length).toBeGreaterThan(0);
        });
    });

    test('TC-API-007 — Non-existent character ID', async ({ request }) => { 
        id = 99999;

        await test.step('Request a character with invalid id', async () => {
        response = await apiService.getCharacterById(id);
        });

        await test.step('Verify HTTP error status', async () => {
            expect(response.status()).toBe(200);
            expect(response.ok()).toBeTruthy();
        });

        await test.step('Verify error response is not a normal characters response', async () => {
            responseBody = await response.json();
            expect(responseBody).toHaveProperty('info');
            expect(responseBody).toHaveProperty('data');
        });

        await test.step('Verify pagination information', async () => {
            info = responseBody.info;

            expect(info).toHaveProperty('nextPage');
            expect(info).toHaveProperty('previousPage');

            expect(info.count).toBe(0);
            expect(info.totalPages).toBe(0);
        });
    });

    test('TC-API-008 — Malformed request', async ({ request }) => { 
        id = 'invalid-id';

        await test.step('Request a character with invalid id', async () => {
        response = await apiService.getCharacterById(id);
        });

        await test.step('Verify HTTP error status', async () => {
            expect(response.status()).toBe(400);
            expect(response.ok()).toBeFalsy();
        });

        await test.step('Verify error response is not a normal characters response', async () => {
            responseBody = await response.text();
            expect(typeof responseBody).toBe('string');
            expect(responseBody.length).toBeGreaterThan(0);
        });

    });
});

